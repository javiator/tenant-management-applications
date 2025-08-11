import sqlite3

# Connect to (or create) the database
conn = sqlite3.connect('instance/app.db')
cursor = conn.cursor()


# Insert data
#cursor.execute("ALTER TABLE tenant ADD COLUMN property_id INTEGER;")

# Commit the changes
#conn.commit()

# Select and print data
cursor.execute("SELECT * FROM tenants")
products = cursor.fetchall()
print("Products in the database:")
for product in products:
    print(product)

# Close the connection
conn.close()