// resources/js/hold-to-confirm.js
function holdToConfirm() {
  return {
    actionHandler: null,
    executed: false,
    livewireClickHandler: null,
    init() {
      this.findLivewireClickHandler();
    },
    findLivewireClickHandler() {
      let element = this.$el.querySelector("[wire\\:click]");
      this.livewireClickHandler = element.getAttribute("wire:click");
      element.removeAttribute("wire:click");
    },
    start() {
      this.executed = false;
      this.actionHandler = setTimeout(async () => {
        this.callLivewireClickHandler();
        this.executed = true;
      }, 800);
    },
    stop() {
      if (this.executed) {
        setTimeout(() => this.executed = false, 2e3);
      }
      if (this.actionHandler) {
        clearTimeout(this.actionHandler);
        this.actionHandler = null;
      }
    },
    callLivewireClickHandler() {
      if (!this.livewireClickHandler.includes("(")) {
        return this.$wire.call(this.livewireClickHandler);
      }
      const { method, params } = this.parseOutMethodAndParams(
        this.livewireClickHandler
      );
      this.$wire.call(method, ...params);
    },
    parseOutMethodAndParams(rawMethod) {
      let method = rawMethod;
      let params = [];
      const methodAndParamString = method.match(new RegExp("(.*?)\\((.*)\\)", "s"));
      if (methodAndParamString) {
        method = methodAndParamString[1];
        let func = new Function("$event", `return (function () {
                for (var l=arguments.length, p=new Array(l), k=0; k<l; k++) {
                    p[k] = arguments[k];
                }
                return [].concat(p);
            })(${methodAndParamString[2]})`);
        params = func(this.eventContext);
      }
      return { method, params };
    }
  };
}
export {
  holdToConfirm as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vanMvaG9sZC10by1jb25maXJtLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBob2xkVG9Db25maXJtKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjdGlvbkhhbmRsZXI6IG51bGwsXG4gICAgICAgIGV4ZWN1dGVkOiBmYWxzZSxcblxuICAgICAgICBsaXZld2lyZUNsaWNrSGFuZGxlcjogbnVsbCxcblxuICAgICAgICBpbml0KCkge1xuICAgICAgICAgICAgdGhpcy5maW5kTGl2ZXdpcmVDbGlja0hhbmRsZXIoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBmaW5kTGl2ZXdpcmVDbGlja0hhbmRsZXIoKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJ1t3aXJlXFxcXDpjbGlja10nKTtcbiAgICAgICAgICAgIHRoaXMubGl2ZXdpcmVDbGlja0hhbmRsZXIgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnd2lyZVxcOmNsaWNrJyk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCd3aXJlXFw6Y2xpY2snKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzdGFydCgpIHtcbiAgICAgICAgICAgIHRoaXMuZXhlY3V0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5hY3Rpb25IYW5kbGVyID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsTGl2ZXdpcmVDbGlja0hhbmRsZXIoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSwgODAwKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzdG9wKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZXhlY3V0ZWQpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZXhlY3V0ZWQgPSBmYWxzZSwgMjAwMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbkhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5hY3Rpb25IYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbkhhbmRsZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNhbGxMaXZld2lyZUNsaWNrSGFuZGxlcigpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5saXZld2lyZUNsaWNrSGFuZGxlci5pbmNsdWRlcygnKCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHdpcmUuY2FsbCh0aGlzLmxpdmV3aXJlQ2xpY2tIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgeyBtZXRob2QsIHBhcmFtcyB9ID0gdGhpcy5wYXJzZU91dE1ldGhvZEFuZFBhcmFtcyhcbiAgICAgICAgICAgICAgICB0aGlzLmxpdmV3aXJlQ2xpY2tIYW5kbGVyXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIHRoaXMuJHdpcmUuY2FsbChtZXRob2QsIC4uLnBhcmFtcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGFyc2VPdXRNZXRob2RBbmRQYXJhbXMocmF3TWV0aG9kKSB7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gcmF3TWV0aG9kXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0gW11cbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZEFuZFBhcmFtU3RyaW5nID0gbWV0aG9kLm1hdGNoKC8oLio/KVxcKCguKilcXCkvcylcblxuICAgICAgICAgICAgaWYgKG1ldGhvZEFuZFBhcmFtU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gbWV0aG9kQW5kUGFyYW1TdHJpbmdbMV1cblxuICAgICAgICAgICAgICAgIC8vIFVzZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBpdCdzIGFyZ3VtZW50cyB0byBwYXJzZSBhbmQgZXZhbCBhbGwgcGFyYW1zXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBcIiRldmVudFwiIGlzIGZvciB1c2UgaW5zaWRlIHRoZSBsaXZld2lyZSBldmVudCBoYW5kbGVyLlxuICAgICAgICAgICAgICAgIGxldCBmdW5jID0gbmV3IEZ1bmN0aW9uKCckZXZlbnQnLCBgcmV0dXJuIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbD1hcmd1bWVudHMubGVuZ3RoLCBwPW5ldyBBcnJheShsKSwgaz0wOyBrPGw7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBwW2tdID0gYXJndW1lbnRzW2tdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW10uY29uY2F0KHApO1xuICAgICAgICAgICAgfSkoJHttZXRob2RBbmRQYXJhbVN0cmluZ1syXX0pYClcblxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IGZ1bmModGhpcy5ldmVudENvbnRleHQpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7IG1ldGhvZCwgcGFyYW1zIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFlLFNBQVIsZ0JBQWlDO0FBQ3BDLFNBQU87QUFBQSxJQUNILGVBQWU7QUFBQSxJQUNmLFVBQVU7QUFBQSxJQUVWLHNCQUFzQjtBQUFBLElBRXRCLE9BQU87QUFDSCxXQUFLLHlCQUF5QjtBQUFBLElBQ2xDO0FBQUEsSUFFQSwyQkFBMkI7QUFDdkIsVUFBSSxVQUFVLEtBQUssSUFBSSxjQUFjLGdCQUFnQjtBQUNyRCxXQUFLLHVCQUF1QixRQUFRLGFBQWEsWUFBYTtBQUU5RCxjQUFRLGdCQUFnQixZQUFhO0FBQUEsSUFDekM7QUFBQSxJQUVBLFFBQVE7QUFDSixXQUFLLFdBQVc7QUFFaEIsV0FBSyxnQkFBZ0IsV0FBVyxZQUFZO0FBQ3hDLGFBQUsseUJBQXlCO0FBRTlCLGFBQUssV0FBVztBQUFBLE1BQ3BCLEdBQUcsR0FBRztBQUFBLElBQ1Y7QUFBQSxJQUVBLE9BQU87QUFDSCxVQUFJLEtBQUssVUFBVTtBQUNmLG1CQUFXLE1BQU0sS0FBSyxXQUFXLE9BQU8sR0FBSTtBQUFBLE1BQ2hEO0FBRUEsVUFBSSxLQUFLLGVBQWU7QUFDcEIscUJBQWEsS0FBSyxhQUFhO0FBQy9CLGFBQUssZ0JBQWdCO0FBQUEsTUFDekI7QUFBQSxJQUNKO0FBQUEsSUFFQSwyQkFBMkI7QUFDdkIsVUFBSSxDQUFDLEtBQUsscUJBQXFCLFNBQVMsR0FBRyxHQUFHO0FBQzFDLGVBQU8sS0FBSyxNQUFNLEtBQUssS0FBSyxvQkFBb0I7QUFBQSxNQUNwRDtBQUVBLFlBQU0sRUFBRSxRQUFRLE9BQU8sSUFBSSxLQUFLO0FBQUEsUUFDNUIsS0FBSztBQUFBLE1BQ1Q7QUFFQSxXQUFLLE1BQU0sS0FBSyxRQUFRLEdBQUcsTUFBTTtBQUFBLElBQ3JDO0FBQUEsSUFFQSx3QkFBd0IsV0FBVztBQUMvQixVQUFJLFNBQVM7QUFDYixVQUFJLFNBQVMsQ0FBQztBQUNkLFlBQU0sdUJBQXVCLE9BQU8sTUFBTSxXQUFDLG1CQUFjLEdBQUM7QUFFMUQsVUFBSSxzQkFBc0I7QUFDdEIsaUJBQVMscUJBQXFCLENBQUM7QUFJL0IsWUFBSSxPQUFPLElBQUksU0FBUyxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFLakMscUJBQXFCLENBQUMsQ0FBQyxHQUFHO0FBRTNCLGlCQUFTLEtBQUssS0FBSyxZQUFZO0FBQUEsTUFDbkM7QUFFQSxhQUFPLEVBQUUsUUFBUSxPQUFPO0FBQUEsSUFDNUI7QUFBQSxFQUNKO0FBQ0o7IiwKICAibmFtZXMiOiBbXQp9Cg==
