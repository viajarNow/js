((window) => {
  let a = document.querySelector("#contents");
  a.innerHTML +=
    '<div id="fixed" onclick="Hretalk()" style="width: 100px;position: fixed;height: 39px;background-color: #6f2e3a;top: 23px;right: 32px;border-radius: 8px;color: white;text-align: center;line-height: 36px;z-index: 99;">快速離開</div>';

  a.innerHTML +=
    '<div id="fixed" onclick="HsayHI()" style="width: 100px;position: fixed;height: 39px;background-color: #6f2e3a;top: 69px;right: 32px;border-radius: 8px;color: white;text-align: center;line-height: 36px;z-index: 99;">嗨</div>';

  a.innerHTML +=
    '<div id="fixed" onclick="Hretalk1()" style="width: 100px;position: fixed;height: 39px;background-color: #6f2e3a;top: 116px;right: 32px;border-radius: 8px;color: white;text-align: center;line-height: 36px;z-index: 99;">男生</div>';

  a.innerHTML +=
    '<div id="fixed" onclick="AutoHretalk()" style="width: 100px;position: fixed;height: 39px;background-color: #6f2e3a;top: 164px;right: 32px;border-radius: 8px;color: white;text-align: center;line-height: 36px;z-index: 99;">AutoLeave</div>';

  a.innerHTML +=
    '<div id="fixed" style="width: 100px;position: fixed;height: 100px;background-color: #6f2e3a;top: 23px;right: 50%;border-radius: 8px;color: white;text-align: center;line-height: 36px;z-index: 99;margin-right: -50px;"><button onclick="switchBtn()" style="border: unset;background-color: #cd3232;border-radius: 5px;font-size: 17px;color: white;padding: 6px 6px;margin: 8px;">自動判斷</button><div id="switch-Content">關</div></div>';

  window.autoSwitch = false;

  window.Hretalk = () => {
    window.leave();
    setTimeout(getText, 2000);
    console.log('"重新連線"');
  };

  window.AutoHretalk = () => {
    switchBtn();
    leave();
    setTimeout(getText, 2000);
    console.log('"重新連線"');
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

  window.getText = () => {
    window.clickStartChat();
    setTimeout(watch, 1000);
  };

  window.watch = () => {
    window.dispatcher.bind("new_message", _text);
  };

  // let blacklistOld = [/'男'/,'男人','男生','嗨男生','台北男','嗨 我男人','Hi 我彰化31熟男','找妹子','hi 男生喔','女？','約','👦','女生嗎','台中男生','桃園男','高雄男','公的','我男生','男喔','嗨男','hi男喔','公','男森']

  window.blacklist = [
    /男/,
    /公/,
    /約/,
    /女\?/,
    /妳好/,
    /聊色/,
    /女\？/,
    /找姐/,
    /嗨嗎/,
    /184/,
    /田力/,
    /女嗎/,
    /大叔/,
    /色/,
    /女生嗎\？/,
    /女生嗎\?/,
    /Boy/,
    /找女生/,
    /難/,
  ];

  window.lastMsg = "";

  window._text = (e) => {
    window.lastMsg = e;
    if (autoSwitch) {
      if (e.sender == 2) {
        let msg = e.message;

        if (blacklist.some((i) => i.test(msg))) {
          // dispatcher.trigger("new_message", {
          // 	message: "女生",
          // 	msg_id: genNewMessageID()
          // })
          setTimeout(window.Hretalk, 1500);
          console.log('"重新連線"');
        } else {
          window.switchBtn();
        }
      } else if (e.sender == 0 && e.leave) {
        window.Hretalk();
        console.log('"重新連線"');
      }
    }

    if (e.sender == 2) {
      console.log(e.message);
    }
  };

  window.switchBtn = () => {
    let switchBtnEl = document.querySelector("#switch-Content");
    window.autoSwitch = !window.autoSwitch;
    window.autoSwitch
      ? (switchBtnEl.innerText = "開")
      : (switchBtnEl.innerText = "關");
  };
  window.audio.src = "";
})(window);
