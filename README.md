# Photo Classifier

A simple web application that allows users to upload an image and classify it using the Google Cloud Vision API.

## Features

- Upload photos
- Classify images into categories like food waste, paper, plastic, and metal
- Display the uploaded image and its classification

## Getting Started

### Prerequisites

- Node.js and npm installed
- Google Cloud account with Vision API enabled
- Service account key JSON file for Google Cloud Vision API

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/photo-classifier.git
    cd photo-classifier
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up Google Cloud credentials:

    - Download your service account key JSON file from Google Cloud Console.
    - Set the environment variable `GOOGLE_APPLICATION_CREDENTIALS` to the path of your JSON key file. For example:

        ```bash
        export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/keyfile.json"
        ```

4. Start the server locally:

    ```bash
    npm start
    ```

5. Open your browser and go to `http://localhost:3000`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
