import {Socket} from "deps/phoenix/web/static/js/phoenix"

class HomeController {
    constructor($rootScope) {
        this.msisdn = "";

        let socket = new Socket("/socket", {params: {token: window.userToken}})
        socket.connect()

        this.channel = socket.channel("rooms:lobby", {})

        this.channel.on("new_msg", payload => {
            this.message = "Message Received: " + payload.msisdn + "(" + payload.mnc + payload.mcc + ")";
            $rootScope.$digest();
        });

        this.channel.join()
          .receive("ok", resp => {
              this.message = "Connected";
          })
          .receive("error", resp => {
              this.fatal = "Failed to connect to Number Lookup Service: " + resp.reason;
              console.log("Failed to connect to Number Lookup Service", resp);
              $rootScope.$digest();
          })
    }

    submitLookup() {
        this.channel.push("new_msg", {msisdn: this.msisdn});
        this.message = "Submitted";
    }
}

HomeController.$inject = ["$rootScope"]

export default HomeController;
