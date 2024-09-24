Final Year Project: Hair Loss Prediction and Analysis System
Introduction
The Hair Loss Prediction and Analysis System is a web application designed to predict and analyze male pattern baldness based on uploaded images. The system uses machine learning models to classify the level of baldness and provides advice based on the prediction. It also allows users to track their image upload history and visualize their usage over time.

Installation
1. Install Python
Ensure you have Python 3.x installed on your system. If not, you can download it from the official Python website.

2. Clone the Repository
Clone the project repository from GitHub:

```bash
Copy code
git clone https://github.com/yourusername/your-repository.git 
```

3. Install Dependencies
Navigate to the project directory and install the required Python packages using pip:

```bash
Copy code
cd your-repository
pip install -r requirements.txt
```

4. Run the Backend
Navigate to the postgre_sql folder and start the FastAPI server using Uvicorn:

```bash
Copy code
cd postgre_sql
uvicorn main:app --reload
```

The backend server should now be running at http://localhost:8000.


Uploading Images :
To upload an image for prediction, use the /upload-image/ endpoint with a POST request. Provide the image file as form data along with the email address of the user.

Viewing Usage :
To view the image upload usage chart, use the /usage/ endpoint with a GET request. Provide the email address of the user as a path parameter.
