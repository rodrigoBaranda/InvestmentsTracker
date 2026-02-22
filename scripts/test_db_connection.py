"""Test Neon PostgreSQL database connection."""

import os
import sys

from dotenv import load_dotenv
import psycopg2

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("ERROR: DATABASE_URL is not set. Add it to your .env file.")
    sys.exit(1)

print("Connecting to database...")

try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    cursor.execute("SELECT version();")
    version = cursor.fetchone()[0]
    print(f"Connection successful!")
    print(f"PostgreSQL version: {version}")

    cursor.execute("SELECT current_database(), current_user;")
    db, user = cursor.fetchone()
    print(f"Database: {db}")
    print(f"User: {user}")

    cursor.close()
    conn.close()
    print("\nConnection closed cleanly.")

except psycopg2.OperationalError as e:
    print(f"ERROR: Could not connect to the database.\n{e}")
    sys.exit(1)
