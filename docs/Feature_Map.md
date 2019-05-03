# Feature Map

## Exposed Objects
The following objects can be constructed, modified, and deleted through our API routes.
Data is persisted inside of a MongoDB instance and files are stored inside of `storage/uploads/` and organized per user.
The database is communicated to via the `mongoose` npm package.

#### Object Types
- Interview
- Upload

---

### Interview
An `interview` object containings all the information regarding a single interview.

#### Schema
- _id: String - The unique ID of the interview (automatically assigned by MongoDB)
- host: String - Email of the creator and owner of this interview
- details: String - The description of the interview
- occursOnDate: String - The date of the interview
- occursAtTime: String - The time of the interview
- scheduledOnDate: String - When the interview was scheduled
- participants: [String] - List of participant email strings
- loadedAssets: [String] - list of upload IDs as strings of all uploads currently rendered in VR
- hostCamInVR: Boolean - Whether or not the host is broadcasting their webcam to the participants
- loadedEnvironment: String - The current environment's ID string

#### Routes
- Create a new interview - Send `POST` request to `/api/interviews`
- Delete an interview - Send `DELETE` request to `/api/interviews/`
- Retrieve all interviews - Send `GET` request to `/api/interviews/`
- Retrieve a single interview with interviewId - Send `GET` request to `/api/interviews/:interviewID`
- Update a interview with interviewId - Send `PUT` request to `/api/interviews/:interviewID`
- Patch (partially update) an interview - Send `PATCH` request to `/api/interviews/:interviewID`
    - Example: `/api/interviews/12345` references interview with _id=12345

---

### Upload
An `upload` represents an asset/object that is uploaded to the server by a user. The uploaded file is saved on the server and its corresponding data is saved in the database. The server allows the upload of files with `png`, `jpeg`, `mp4`, or `octet-stream` mimetypes. These are sorted into images, videos, and 3D object models.

#### Schema
- _id: String - The unique ID of the upload (automatically assigned by MongoDB)
- name: String - Name of the upload
- owner: String - Email of the user that uploaded the object
- type: String - Typye of upload
- filetype: String - Mimetype of the upload
- fullpath: String - Full path to the upload file on the server
  - This is stored in `/storage/uploads/:stripped_owners_email` where `:stripped_owners_email` represents the email of the owner stripped of any non-alphanumerical characters. 
  (ie. `email.replace(/[^a-zA-Z0-9]/g,'')`)
  - Example: `example@email.com` uploads `example.jpg` -> file is saved at `/storage/uploads/exampleemailcom/example.jpg`
- height: Number - First dimension (height) of the upload
- width: Number - Second dimension (width) of the upload

#### Routes
- Create a new upload - Send `POST` request to `/api/uploads`
- Retrieve all uploads - Send `GET` request to `/api/uploads`
- Retrieve one upload - Send `GET` request to `/api/uploads/:uploadID`
- Delete a specific upload by id - Send `DELETE` request to `/api/uploads/:uploadID`
- Retrieve a file by id - Send `GET` request to `/uploads/:stripped_owners_email/:uploadID/:firebase_authentication_token`

---

## Future Goals
## Gotchas
## Files
## Libraries
## Need to dos - Important stuff
uploads resolve duplicate names
