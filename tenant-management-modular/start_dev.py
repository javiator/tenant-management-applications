#!/usr/bin/env python3
"""
Development startup script for Tenant Management System (Modular Version)
This script can start both backend and frontend servers
"""

import os
import sys
import subprocess
import time
import threading
from pathlib import Path

def run_backend():
    """Run the Flask backend server."""
    print("Starting Flask backend server...")
    try:
        subprocess.run([sys.executable, "run.py"], check=True)
    except KeyboardInterrupt:
        print("\nBackend server stopped.")
    except Exception as e:
        print(f"Error starting backend: {e}")

def run_frontend():
    """Run the React frontend development server."""
    print("Starting React frontend server...")
    frontend_dir = Path("frontend")
    
    if not frontend_dir.exists():
        print("Frontend directory not found. Please run 'npm install' in the frontend directory first.")
        return
    
    try:
        # Change to frontend directory and start npm
        os.chdir(frontend_dir)
        subprocess.run(["npm", "start"], check=True)
    except KeyboardInterrupt:
        print("\nFrontend server stopped.")
    except FileNotFoundError:
        print("npm not found. Please install Node.js and npm first.")
    except Exception as e:
        print(f"Error starting frontend: {e}")

def main():
    """Main function to start both servers."""
    print("Tenant Management System - Modular Version - Development Server")
    print("=" * 60)
    
    # Check if we should run both or just one
    if len(sys.argv) > 1:
        mode = sys.argv[1].lower()
        
        if mode == "backend":
            run_backend()
        elif mode == "frontend":
            run_frontend()
        else:
            print("Usage: python start_dev.py [backend|frontend]")
            print("If no argument provided, starts both servers.")
    else:
        # Start both servers in separate threads
        print("Starting both backend and frontend servers...")
        print("Backend will be available at: http://localhost:5000")
        print("Frontend will be available at: http://localhost:3000")
        print("Press Ctrl+C to stop both servers.")
        
        backend_thread = threading.Thread(target=run_backend)
        frontend_thread = threading.Thread(target=run_frontend)
        
        try:
            backend_thread.start()
            time.sleep(2)  # Give backend a moment to start
            frontend_thread.start()
            
            # Wait for both threads
            backend_thread.join()
            frontend_thread.join()
            
        except KeyboardInterrupt:
            print("\nShutting down servers...")
            sys.exit(0)

if __name__ == "__main__":
    main()
