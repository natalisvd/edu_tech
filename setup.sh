#!/bin/bash

# Function to display green text
green_echo() {
    echo -e "\033[32m$1\033[0m"
}

# Function to display orange-like text (yellow)
orange_echo() {
    echo -e "\033[33m$1\033[0m"
}

# Cloning the backend repository
green_echo "Cloning the backend repository..."
git clone https://github.com/natalisvd/edu_tech_back.git
cd edu_tech_back || exit

# Installing backend dependencies
green_echo "Installing backend dependencies..."
if [ -f .env.example ]; then
    cp .env.example .env
else
    green_echo ".env.example not found!"
fi
npm install

# Prompting for .env values for backend
green_echo "Filling in the .env file for backend... "

# Prompting for DATABASE_URL in orange
orange_echo "Enter DATABASE_URL: "
read -p "> " DATABASE_URL

# Prompting for PORT in orange
orange_echo "Enter PORT (e.g., 5000):"
read -p "> " PORT

# Function to remove existing lines and update .env correctly
update_env_variable() {
    local var_name=$1
    local var_value=$2
    local env_file=".env"

    # Remove any existing lines that start with the variable name
    sed -i '' "/^$var_name=/d" "$env_file"
    
    # Add the new variable to the file, with proper quoting for the DATABASE_URL
    if [ "$var_name" = "DATABASE_URL" ]; then
        echo "$var_name=\"$var_value\"" >> "$env_file"
    else
        echo "$var_name=$var_value" >> "$env_file"
    fi
}

# Calling the function to update .env for backend
update_env_variable "DATABASE_URL" "$DATABASE_URL"
update_env_variable "PORT" "$PORT"

# Running Prisma migrations
green_echo "Running Prisma migrations..."
npx prisma migrate dev

# Backend setup complete
green_echo "Backend setup complete!"

# Navigate back to the root directory to set up the frontend
cd ..

# Installing frontend dependencies
green_echo "Installing frontend dependencies..."
npm install

# Prompting for .env values for frontend
green_echo "Filling in the .env file for frontend..."

# Creating .env file if it doesn't exist
if [ -f .env.example ]; then
    cp .env.example .env
else
    green_echo ".env.example not found!"
fi

# Checking if .env.example exists
if [ -f .env.example ]; then
    # Adding variables from .env.example to .env if .env doesn't exist
    cat .env.example >> .env
else
    # If .env.example does not exist, prompt for required variables
    orange_echo "No .env.example found. Please enter the required variables:"
    
    # Prompting for NEXT_PUBLIC_SUPABASE_URL in orange
    orange_echo "Enter NEXT_PUBLIC_SUPABASE_URL:"
    read -p "> " NEXT_PUBLIC_SUPABASE_URL

    # Prompting for NEXT_PUBLIC_SUPABASE_ANON_KEY in orange
    orange_echo "Enter NEXT_PUBLIC_SUPABASE_ANON_KEY:"
    read -p "> " NEXT_PUBLIC_SUPABASE_ANON_KEY

    # Prompting for NEXT_PUBLIC_API_URL in orange
    orange_echo "Enter NEXT_PUBLIC_API_URL:"
    read -p "> " NEXT_PUBLIC_API_URL

    # Prompting for NEXT_PUBLIC_IMAGES_URL in orange
    orange_echo "Enter NEXT_PUBLIC_IMAGES_URL:"
    read -p "> " NEXT_PUBLIC_IMAGES_URL

    # Updating .env for frontend with the provided values
    update_env_variable "NEXT_PUBLIC_SUPABASE_URL" "$NEXT_PUBLIC_SUPABASE_URL"
    update_env_variable "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$NEXT_PUBLIC_SUPABASE_ANON_KEY"
    update_env_variable "NEXT_PUBLIC_API_URL" "$NEXT_PUBLIC_API_URL"
    update_env_variable "NEXT_PUBLIC_IMAGES_URL" "$NEXT_PUBLIC_IMAGES_URL"
fi

# all setup complete
green_echo "Frontend setup complete!"
orange_echo "All setup completed!"
