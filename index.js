((window) => {
  const log = console.log;
  console.log = function () {};
  let a = document.querySelector("#contents");

  const style = ({ top, left, right }) => {
    const topStr = top ? `${top}px` : "unset";
    const leftStr = left ? `${left}px` : "unset";
    const rightStr = right ? `${right}px` : "unset";
    return `style="
              width: 100px;
              position: fixed;
              height: 39px;
              background-color: #6f2e3a;
              top: ${topStr};
              left: ${leftStr};
              right: ${rightStr};
              border-radius: 8px;
              color: white;
              text-align: center;
              line-height: 36px;
              z-index: 99999999999;
            "`;
  };

  const style1 = style({ top: 23, right: 32 });

  a.innerHTML += `<div id="fixed" ${style1} onclick="Hretalk()">快速離開</div>`;

  const style2 = style({ top: 69, right: 32 });

  a.innerHTML += `<div id="fixed" ${style2} onclick="HsayHI()">嗨</div>`;

  const style3 = style({ top: 116, right: 32 });

  a.innerHTML += `<div id="fixed" ${style3} onclick="Hretalk1()">男生</div>`;

  const style4 = style({ top: 23, left: 32 });

  a.innerHTML += `<div id="fixed" ${style4} onclick="Hretalk2()">終結機器人</div>`;

  const style5 = style({ top: 164, right: 32 });

  a.innerHTML += `<div id="fixed" ${style5} onclick="AutoHretalk()">AutoLeave</div>`;

  const style6 = `style="width: 100px;
                    position: fixed;
                    height: 100px;
                    background-color: #6f2e3a;
                    top: 23px;
                    right: 50%;
                    border-radius: 8px;
                    color: white;
                    text-align: center;
                    line-height: 36px;
                    z-index: 99;
                    margin-right: -50px;
                    "><button onclick="switchBtn()" style="border: unset;
                    background-color: #cd3232;
                    border-radius: 5px;
                    font-size: 17px;
                    color: white;
                    padding: 6px 6px;
                    margin: 8px;
                    "`;

  a.innerHTML += `<div id="fixed" ${style6}>自動判斷</button><div id="switch-Content">關</div></div>`;

  window.autoSwitch = false;

  window.Hretalk = () => {
    if (!window.onClickDom) {
      window.onClickDom = true;
      window.leave();
      setTimeout(getText, 2000);
      log('"重新連線"');
    }
  };

  window.AutoHretalk = () => {
    if (!window.onClickDom) {
      window.onClickDom = true;
      switchBtn();
      leave();
      setTimeout(getText, 2000);
      log('"重新連線"');
    }
  };

  window.HsayHI = () => {
    window.dispatcher.trigger("new_message", {
      message: "嗨",
      msg_id: genNewMessageID(),
    });
  };

  window.Hretalk1 = () => {
    window.dispatcher.trigger("new_message", {
      message: "男生",
      msg_id: genNewMessageID(),
    });
  };

  window.Hretalk2 = () => {
    let i = 100;
    const interval = setInterval(() => {
      if (!i) {
        clearInterval(interval);
      }
      window.dispatcher.trigger("new_message", {
        message: "反詐騙請撥打165",
        msg_id: genNewMessageID(),
      });
      i--;
    }, 200);
  };
  window.onClickDom = false;
  window.getText = () => {
    window.onClickDom = false;
    window.clickStartChat();
    setTimeout(watch, 1500);
  };

  window.watch = () => {
    window.dispatcher.bind("new_message", _text);
  };

  window.blacklist = [
    "男",
    "公",
    "女?",
    "女？",
    "妳好",
    "聊色",
    "找姐",
    "184",
    "183",
    "田力",
    "女嗎",
    "大叔",
    "色",
    "女生嗎？",
    "女生嗎?",
    "Boy",
    "boy",
    "找女生",
    "難",
  ];

  window.lastMsg = "";
  window.time = "";
  window._text = (e) => {
    if (e.time !== window.time) {
      window.lastMsg = e;
      window.time = e.time
      if (autoSwitch) {
        if (e.sender == 2) {
          let msg = e.message;
          if (blacklist.some((i) => msg.includes(i)) && msg.length < 7) {
            // dispatcher.trigger("new_message", {
            // 	message: "女生",
            // 	msg_id: genNewMessageID()
            // })
            setTimeout(window.Hretalk, 1500);
            log('"重新連線 黑名單"');
          } else {
            console.log("switchBtn");
            window.switchBtn();
          }
        } else if (e.sender == 0 && e.leave) {
          setTimeout(window.Hretalk, 1500);
          log('"重新連線 對方已離開"');
        }
      }

      if (e.sender == 2) {
        log(e.message);
      }
    }
  };

  window.switchBtn = () => {
    let switchBtnEl = document.querySelector("#switch-Content");
    window.autoSwitch = !window.autoSwitch;
    switchBtnEl.innerText = window.autoSwitch ? "開" : "關";
  };
  window.audio.play = () => {};
})(window);
