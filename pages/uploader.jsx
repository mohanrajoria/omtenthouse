import * as React from "react";

function Uploader() {
  React.useEffect(() => {
    if (window && typeof window !== 'undefined') {
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      document.getElementsByTagName('form')[0].addEventListener("submit", (e) => {
        e.preventDefault();
      
        const files = document.querySelector("[type=file]").files;
        const formData = new FormData();
      
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          formData.append("file", file);
          formData.append("upload_preset", "ml_default");
      
          fetch(url, {
            method: "POST",
            body: formData
          })
          .then((response) => {
            return response.text();
          })
          .then((data) => {
            document.getElementById("data").innerHTML += data;
          });
        }
      });
    }
  }, []);
  
  return (
    <div>
      <div>UPLOAD</div>
      <br />
      <form method="post" encType="multipart/form-data">
        <input type="file" name="files[]" multiple />
        <input type="submit" value="Upload Files" name="submit" />
      </form>

      <p id="data"> </p>
    </div>
  );
}

export default Uploader;