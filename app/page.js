"use client";

import Style from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={Style.home}>
        <div className={Style.home_text}>
          <p></p>
          <h1>
            <span>Blockchain</span>-Powered Secure Communication
          </h1>
          <h3>
            The <span>Future</span> of <span>Private</span> Conversations
          </h3>
          <h4></h4>
        </div>
      </div>
    </>
  );
}
