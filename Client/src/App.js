import './App.css';

function App() {
  return (
    <>
      
        <form action="" >
            <div className="drop-zone">
                <div className="icon-container">
                    <img src="file.svg" draggable="false" className="center" alt="File Icon"/>
                    <img src="file.svg" draggable="false" className="left" alt="File Icon"/>
                    <img src="file.svg" draggable="false" className="right" alt="File Icon"/>
                </div>
                <input type="file" id="fileInput"  />
                <div className="title">Drop your Files here or, <span id="browseBtn">browse</span></div>
            </div>
        </form>
        <div className="progress-container">
            <div className="bg-progress"></div>

            <div className="inner-container">
                <div className="status">Uploading...</div>
                <div className="percent-container">
                    <span className="percentage" id="progressPercent">0</span>%
                </div>
                <div className="progress-bar"></div>
            </div>

        </div>
        <div className="sharing-container">
            <p className="expire">Link expires in 24 hrs</p>


            <div className="input-container">
                <input type="text" id="fileURL" readOnly/>
                <img src="./copy-icon.svg" id="copyURLBtn" alt="copy to clipboard icon"/>
            </div>


            <p className="email-info">Or Send via Email</p>
            <div className="email-container">
                <form id="emailForm">
                    <div className="filed">
                        <label htmlFor="fromEmail">Your email</label>
                        <input type="email" autoComplete="email" required name="from-email" id="fromEmail"/>
                    </div>

                    <div className="filed">
                        <label htmlFor="toEmail">Receiver's email</label>
                        <input type="email" required autoComplete="receiver" name="to-email" id="toEmail"/>
                    </div>
                    <div className="send-btn-container">
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
        <div className="image-vector"></div>
        <div className="toast">Sample message</div>
       
    </>
  );
}

export default App;
