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
      const element = this.$el.querySelector("[wire\\:click]");
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
      const methodAndParamString = method.match(/(.*?)\((.*)\)/s);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vanMvaG9sZC10by1jb25maXJtLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBob2xkVG9Db25maXJtKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjdGlvbkhhbmRsZXI6IG51bGwsXG4gICAgICAgIGV4ZWN1dGVkOiBmYWxzZSxcblxuICAgICAgICBsaXZld2lyZUNsaWNrSGFuZGxlcjogbnVsbCxcblxuICAgICAgICBpbml0KCkge1xuICAgICAgICAgICAgdGhpcy5maW5kTGl2ZXdpcmVDbGlja0hhbmRsZXIoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBmaW5kTGl2ZXdpcmVDbGlja0hhbmRsZXIoKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignW3dpcmVcXFxcOmNsaWNrXScpO1xuICAgICAgICAgICAgdGhpcy5saXZld2lyZUNsaWNrSGFuZGxlciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd3aXJlXFw6Y2xpY2snKTtcblxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3dpcmVcXDpjbGljaycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN0YXJ0KCkge1xuICAgICAgICAgICAgdGhpcy5leGVjdXRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLmFjdGlvbkhhbmRsZXIgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxMaXZld2lyZUNsaWNrSGFuZGxlcigpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9LCA4MDApO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN0b3AoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5leGVjdXRlZCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5leGVjdXRlZCA9IGZhbHNlLCAyMDAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aW9uSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGlvbkhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uSGFuZGxlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2FsbExpdmV3aXJlQ2xpY2tIYW5kbGVyKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxpdmV3aXJlQ2xpY2tIYW5kbGVyLmluY2x1ZGVzKCcoJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kd2lyZS5jYWxsKHRoaXMubGl2ZXdpcmVDbGlja0hhbmRsZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB7IG1ldGhvZCwgcGFyYW1zIH0gPSB0aGlzLnBhcnNlT3V0TWV0aG9kQW5kUGFyYW1zKFxuICAgICAgICAgICAgICAgIHRoaXMubGl2ZXdpcmVDbGlja0hhbmRsZXJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgdGhpcy4kd2lyZS5jYWxsKG1ldGhvZCwgLi4ucGFyYW1zKTtcbiAgICAgICAgfSxcblxuICAgICAgICBwYXJzZU91dE1ldGhvZEFuZFBhcmFtcyhyYXdNZXRob2QpIHtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSByYXdNZXRob2RcbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSBbXVxuICAgICAgICAgICAgY29uc3QgbWV0aG9kQW5kUGFyYW1TdHJpbmcgPSBtZXRob2QubWF0Y2goLyguKj8pXFwoKC4qKVxcKS9zKVxuXG4gICAgICAgICAgICBpZiAobWV0aG9kQW5kUGFyYW1TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBtZXRob2QgPSBtZXRob2RBbmRQYXJhbVN0cmluZ1sxXVxuXG4gICAgICAgICAgICAgICAgLy8gVXNlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGl0J3MgYXJndW1lbnRzIHRvIHBhcnNlIGFuZCBldmFsIGFsbCBwYXJhbXNcbiAgICAgICAgICAgICAgICAvLyBUaGlzIFwiJGV2ZW50XCIgaXMgZm9yIHVzZSBpbnNpZGUgdGhlIGxpdmV3aXJlIGV2ZW50IGhhbmRsZXIuXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmMgPSBuZXcgRnVuY3Rpb24oJyRldmVudCcsIGByZXR1cm4gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsPWFyZ3VtZW50cy5sZW5ndGgsIHA9bmV3IEFycmF5KGwpLCBrPTA7IGs8bDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBba10gPSBhcmd1bWVudHNba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbXS5jb25jYXQocCk7XG4gICAgICAgICAgICB9KSgke21ldGhvZEFuZFBhcmFtU3RyaW5nWzJdfSlgKVxuXG4gICAgICAgICAgICAgICAgcGFyYW1zID0gZnVuYyh0aGlzLmV2ZW50Q29udGV4dClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHsgbWV0aG9kLCBwYXJhbXMgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWUsU0FBUixnQkFBaUM7QUFDcEMsU0FBTztBQUFBLElBQ0gsZUFBZTtBQUFBLElBQ2YsVUFBVTtBQUFBLElBRVYsc0JBQXNCO0FBQUEsSUFFdEIsT0FBTztBQUNILFdBQUsseUJBQXlCO0FBQUEsSUFDbEM7QUFBQSxJQUVBLDJCQUEyQjtBQUN2QixZQUFNLFVBQVUsS0FBSyxJQUFJLGNBQWMsZ0JBQWdCO0FBQ3ZELFdBQUssdUJBQXVCLFFBQVEsYUFBYSxZQUFhO0FBRTlELGNBQVEsZ0JBQWdCLFlBQWE7QUFBQSxJQUN6QztBQUFBLElBRUEsUUFBUTtBQUNKLFdBQUssV0FBVztBQUVoQixXQUFLLGdCQUFnQixXQUFXLFlBQVk7QUFDeEMsYUFBSyx5QkFBeUI7QUFFOUIsYUFBSyxXQUFXO0FBQUEsTUFDcEIsR0FBRyxHQUFHO0FBQUEsSUFDVjtBQUFBLElBRUEsT0FBTztBQUNILFVBQUksS0FBSyxVQUFVO0FBQ2YsbUJBQVcsTUFBTSxLQUFLLFdBQVcsT0FBTyxHQUFJO0FBQUEsTUFDaEQ7QUFFQSxVQUFJLEtBQUssZUFBZTtBQUNwQixxQkFBYSxLQUFLLGFBQWE7QUFDL0IsYUFBSyxnQkFBZ0I7QUFBQSxNQUN6QjtBQUFBLElBQ0o7QUFBQSxJQUVBLDJCQUEyQjtBQUN2QixVQUFJLENBQUMsS0FBSyxxQkFBcUIsU0FBUyxHQUFHLEdBQUc7QUFDMUMsZUFBTyxLQUFLLE1BQU0sS0FBSyxLQUFLLG9CQUFvQjtBQUFBLE1BQ3BEO0FBRUEsWUFBTSxFQUFFLFFBQVEsT0FBTyxJQUFJLEtBQUs7QUFBQSxRQUM1QixLQUFLO0FBQUEsTUFDVDtBQUVBLFdBQUssTUFBTSxLQUFLLFFBQVEsR0FBRyxNQUFNO0FBQUEsSUFDckM7QUFBQSxJQUVBLHdCQUF3QixXQUFXO0FBQy9CLFVBQUksU0FBUztBQUNiLFVBQUksU0FBUyxDQUFDO0FBQ2QsWUFBTSx1QkFBdUIsT0FBTyxNQUFNLGdCQUFnQjtBQUUxRCxVQUFJLHNCQUFzQjtBQUN0QixpQkFBUyxxQkFBcUIsQ0FBQztBQUkvQixZQUFJLE9BQU8sSUFBSSxTQUFTLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUtqQyxxQkFBcUIsQ0FBQyxDQUFDLEdBQUc7QUFFM0IsaUJBQVMsS0FBSyxLQUFLLFlBQVk7QUFBQSxNQUNuQztBQUVBLGFBQU8sRUFBRSxRQUFRLE9BQU87QUFBQSxJQUM1QjtBQUFBLEVBQ0o7QUFDSjsiLAogICJuYW1lcyI6IFtdCn0K
