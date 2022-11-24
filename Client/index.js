const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector(".browseBtn");
const fileInput = document.querySelector("#fileInput");

const progressContainer = document.querySelector(".progress-container");
const bgProgress = document.querySelector(".bg-progress");
const progressBar = document.querySelector(".progress-bar");
const percentDiv = document.querySelector("#percent");

const sharingContainer = document.querySelector(".sharing-container");
const fileURLInput = document.querySelector("#fileURL");
const copyBtn = document.querySelector("#copyBtn");
const emailForm = document.querySelector("#emailForm");

const toast = document.querySelector(".toast");

const host="http://localhost:3000/";
const uploadURL=`${host}api/files`;
const emailURL=`${host}api/files/send`;

const maxAllowedSize = 10000*1024*1024;

dropZone.addEventListener("dragover", (e) => {
    console.log("dragging..")
    if(! dropZone.classList.contains("dragged")){
        dropZone.classList.add("dragged");
    }
});


dropZone.addEventListener("dragleave",()=>{
    dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop",()=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
    const files = e.dataTransfer.files;
    console.table(files);
    if(files.length){
        fileInput.files=files;
        uploadFile()
    }
});

fileInput.addEventListener("change",()=>{
    uploadFile();
})

browseBtn.addEventListener("click",()=>{
    fileInput.click()
})

copyBtn.addEventListener("click",()=>{
    fileURLInput.Select();
    document.execCommand("copy");
    showToast("Copied to clipboard");
});

const uploadFile = ()=>{
    progressContainer.style.display = "block";
    if(fileInput.files.length>1){
        resetFileInput();
        showToast("Only Upload 1 file!!");
        return;
    }
    const file = fileInput.files[0];

    if(file.size>maxAllowedSize){
        resetFileInput();
        showToast("can't upload more than 10GB");
        return;
    }
    
    const formData = new FormData();
    formData.append("myfile",file);

    const xhr = new XMLHttpRequest()
        xhr.onreadystatechange=()=>{
            if(xhr.readyState === XMLHttpRequest.DONE);
            //console.log(xhr.response);
            onuploadSuccess(JSON.parse(xhr.response));
        };
        xhr.upload.onprogress=updateProgress;
        xhr.upload.onerror = ()=> {
            showToast(`Error in upload: ${xhr.status}.`);
            fileInput.value = ""; 
          };
        xhr.open("POST",uploadURL);
        xhr.send(formData)
};

const updateProgress = (e)=>{
    const percent = Math.round((e.loaded / e.total)*100);
    // console.log(percent);
    bgProgress.style.width=`${percent}%`;
    percentDiv.innerText=percent;
    progressBar.style.transform = `scaleX(${percent/100})`;
}

const onuploadSuccess=({file:url})=>{
    //console.log(url);
    resetFileInput();
    emailForm[2].removeAttribute("disabled");
    progressContainer.style.display = "none"
    sharingContainer.style.display = "block"
    fileURLInput.value = url;
}

const resetFileInput=()=>{
    fileInput.value="";
}
emailForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    
    emailForm[2].setAttribute("disabled", "true");
    emailForm[2].innerText = "Sending";
  
    const url = fileURLInput.value;
  
    const formData = {
      uuid: url.split("/").splice(-1, 1)[0],
      emailTo: emailForm.elements["to-email"].value,
      emailFrom: emailForm.elements["from-email"].value,
    };
    console.table(formData);
    fetch(emailURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((success) => {
        if (success) {
          showToast("Email Sent");
          sharingContainer.style.display = "none"; 
          showToast("Email Sent");
        }
      });
  });



  const showToast = (msg) => {
    toast.innerText = msg;
    toast.style.transform="translate(-50%,0)"
    clearTimeout(toastTimer);
    const toastTimer = setTimeout(() => {
        toast.style.transform="translate(-50%,60px)"
      }, 2000);
  };