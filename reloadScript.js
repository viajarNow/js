;(() => {
  const bodyFirstChildElement = document.body.firstElementChild;
  const customElement = document.createElement("div");
  customElement.setAttribute("id", "innerVueApp");
  document.body.insertBefore(customElement, bodyFirstChildElement);
  const getNowTime = () => {
    const nowTime = new Date();
    const nowHour = nowTime.getHours();
    const nowMinute = nowTime.getMinutes();
    const nowSecond = nowTime.getSeconds();
    const nowMilliseconds = nowTime.getMilliseconds()
    const formatZero = (time) => (time < 10 ? `0${time}` : `${time}`);
    return {
      timestamp: nowTime.getTime(),
      hour: formatZero(nowHour),
      minute: formatZero(nowMinute),
      second: formatZero(nowSecond),
      ms: formatZero(nowMilliseconds)
    };
  };

  const vueScript = document.createElement("script");
  vueScript.setAttribute("src", "https://cdn.jsdelivr.net/npm/vue@2.6.14");
  document.head.appendChild(vueScript);

  const vueScriptPromise = new Promise((resolve, reject) => {
    vueScript.onload = () => resolve();
    vueScript.error = () => reject();
  });
  const template = `<div style="position: fixed;
                                top: 50px;
                                right: 50px;
                                border: 1px solid black;
                                border-radius: 10px;
                                padding: 10px;
                                box-shadow: 5px 5px 15px black;
                                width: 300px;
                                z-index: 999999999999;
                                background-color: #91b9b9;
                                ">
                      <div>
                        現在時間 {{ nowTime.hour }}:{{ nowTime.minute }}:{{ nowTime.second }}:{{ nowTime.ms }}
                      </div>
                      <div>
                        <input v-model="date" style="width: 140px" type="date" />
                      </div>
                      <div>
                        <input v-model="hours" @keypress="limitNum($event,'hours')" style="width: 30px; padding: 0;margin: 0;" type="text" />
                        時
                        <input v-model="minutes" @keypress="limitNum($event,'minutes')" style="width: 30px; padding: 0;margin: 0;" type="text" />
                        分
                        <input v-model="seconds" @keypress="limitNum($event,'seconds')" style="width: 30px; padding: 0;margin: 0;" type="text" />
                        秒
                        <input v-model="ms" @keypress="limitNum($event,'ms')" style="width: 30px; padding: 0;margin: 0;" type="text" />
                        毫秒
                      </div>
                      <div v-if="!start">
                        <button @click="startCountdown">
                          開始
                        </button>
                      </div>
                      <div v-if="start">
                        剩餘時間 {{countdown.h}}時{{countdown.m}}分{{countdown.s}}秒{{countdown.ms}}毫秒
                      </div>
                    </div>`;
  vueScriptPromise.then(() => {
    new Vue({
      el: "#innerVueApp",
      template,
      data() {
        return {
          date: "",
          hours: 0,
          minutes: 0,
          seconds: 0,
          ms:0,
          nowTimeInterval: null,
          nowTime: {},
          countdownInterval: null,
          countdown: {},
          start: false,
        };
      },
      created() {
        this.nowTimeInterval = setInterval(() => {
          this.nowTime = getNowTime();
        }, 10);
      },
      methods: {
        startCountdown() {
          this.start = true;
          this.countdownInterval = setInterval(() => {
            const nowTime = new Date().getTime();
            const e = new Date(this.date);
            e.setHours(this.hours);
            e.setMinutes(this.minutes);
            e.setSeconds(this.seconds);
            const targetTime = e.getTime();
            const t = Math.trunc((targetTime - nowTime) / 1e3);
            this.countdown = {
              h: Math.trunc(t / 60 / 60) % 24 || 0,
              m: Math.trunc(t / 60) % 60 || 0,
              s: t % 60 || 0,
              ms: (targetTime - nowTime) % 1e3 || 0,
            };

            if (nowTime > targetTime) {
              location.reload();
              clearInterval(this.countdownInterval);
            }
          }, 10);
        },
        limitNum(event, type) {
          const checkTime = (type, limitTime) =>
            +`${type}${event.key}` >= limitTime;

          if (!(event.keyCode >= 48 && event.keyCode <= 57)) {
            event.preventDefault();
          }

          if (type === "hours") {
            if (checkTime(this.hours, 24)) {
              event.preventDefault();
            }
          }

          if (type === "minutes") {
            if (checkTime(this.minutes, 60)) {
              event.preventDefault();
            }
          }

          if (type === "seconds") {
            if (checkTime(this.seconds, 60)) {
              event.preventDefault();
            }
          }

          if (type === "ms") {
            if (checkTime(this.ms, 1000)) {
              event.preventDefault();
            }
          }
        },
      },
    });
  });
})();
