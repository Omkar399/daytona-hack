/**
 * Wrapper service to call Python Browser Use Local service
 * This bridges TypeScript/Node.js code with Python Browser Use library
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);

interface PostToXResult {
  status: string;
  result?: string;
  screenshots: string[];
  task_id?: string;
}

export class BrowserLocalWrapper {
  private pythonScriptPath: string;

  constructor() {
    // Path to the Python script
    this.pythonScriptPath = path.join(
      __dirname,
      'browser-local.py'
    );

    // Verify Python script exists
    if (!fs.existsSync(this.pythonScriptPath)) {
      throw new Error(
        `Python script not found at: ${this.pythonScriptPath}\n` +
        `Make sure browser-local.py exists in the service/browser directory`
      );
    }
  }

  /**
   * Post to X (Twitter) using local browser with file upload support
   */
  async postToX(
    postContent: string,
    screenshotUrls: string[] = [],
    options?: {
      xUsername?: string;
      xPassword?: string;
    }
  ): Promise<PostToXResult> {
    console.log('🐍 Calling Python Browser Use Local service...');
    console.log(`   Post content: ${postContent.substring(0, 100)}...`);
    console.log(`   Screenshots: ${screenshotUrls.length}`);

      // Set environment variables
      // Bun automatically loads .env files, so process.env already has all .env variables
      // We pass all of them to Python, plus any explicit options
      const env = {
        ...process.env, // This includes all .env variables loaded by Bun
        // Explicitly set these (options override .env, .env values are fallback)
        BROWSER_USE_API_KEY: process.env.BROWSER_USE_API_KEY || '',
        X_USERNAME: options?.xUsername || process.env.X_USERNAME || '',
        X_PASSWORD: options?.xPassword || process.env.X_PASSWORD || '',
        BROWSER_USE_CLOUD_PROFILE_ID: process.env.BROWSER_USE_CLOUD_PROFILE_ID || '',
        USE_LOCAL_BROWSER: process.env.USE_LOCAL_BROWSER || 'false',
      };

      try {
        // Use venv Python if available, otherwise use system python3
        // __dirname is the compiled output directory, need to go up to api root
        const apiRoot = path.resolve(__dirname, '../../..');
        const venvPython = path.join(apiRoot, 'venv-browser/bin/python3');
        const pythonCmd = fs.existsSync(venvPython) ? venvPython : 'python3';
        
        // Build command arguments - use execFile for proper argument handling (no shell escaping issues)
        const { execFile } = require('child_process');
        const { promisify } = require('util');
        const execFileAsync = promisify(execFile);
        
        const args = [
          postContent, // First arg is post content
          ...screenshotUrls, // Rest are screenshot URLs
        ];
        
        console.log(`📝 Executing Python Browser Use Local...`);
        console.log(`   Python: ${pythonCmd}`);
        console.log(`   Script: ${this.pythonScriptPath}`);
        console.log(`   Args: ${args.length} arguments`);

      // Use spawn instead of execFile to stream output in real-time
      const { spawn } = await import('child_process');
      
      return new Promise((resolve, reject) => {
        const process = spawn(pythonCmd, [this.pythonScriptPath, ...args], {
          env,
          cwd: path.dirname(this.pythonScriptPath),
        });

        let stdout = '';
        let stderr = '';

        // Stream stdout to console in real-time
        process.stdout?.on('data', (data) => {
          const text = data.toString();
          console.log(text); // Stream to console
          stdout += text;
        });

        // Stream stderr to console in real-time
        process.stderr?.on('data', (data) => {
          const text = data.toString();
          console.error(text); // Stream to console
          stderr += text;
        });

        process.on('close', (code) => {
          if (code !== 0) {
            reject(new Error(`Python script exited with code ${code}\n${stderr}`));
            return;
          }
          
          // Continue with existing JSON parsing logic below
          this.parseOutput(stdout, stderr, resolve, reject);
        });

        process.on('error', (error) => {
          reject(new Error(`Failed to start Python process: ${error.message}`));
        });
      });
    } catch (error: any) {
      console.error('❌ Python service failed:', error.message);
      if (error.stdout) console.error('   stdout:', error.stdout);
      if (error.stderr) console.error('   stderr:', error.stderr);
      throw new Error(`Browser Local service failed: ${error.message}`);
    }
  }

  private parseOutput(stdout: string, stderr: string, resolve: any, reject: any) {
    try {

      // Python script outputs JSON to stdout, but may have other output too
      // Find the JSON line (should be the last line or a line starting with {)
      const lines = stdout.trim().split('\n').filter(line => line.trim());
      let jsonLine = lines[lines.length - 1]; // Usually last line
      
      // If last line doesn't look like JSON, search backwards
      if (!jsonLine || !jsonLine.trim().startsWith('{')) {
        jsonLine = lines.reverse().find((line) => line.trim().startsWith('{'));
      }
      
      if (!jsonLine) {
        console.error('Full stdout:', stdout);
        if (stderr) console.error('Stderr:', stderr);
        throw new Error(`No JSON output found. Python may have failed.`);
      }

      const result = JSON.parse(jsonLine.trim());
      
      if (result.status === 'failed') {
        reject(new Error(result.error || 'Python service failed'));
        return;
      }
      
      console.log('✅ Python service completed successfully');
      
      resolve(result);
    } catch (error: any) {
      console.error('❌ Failed to parse Python output:', error.message);
      reject(error);
    }
  }
}

