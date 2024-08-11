export default function holdToConfirm() {
    return {
        actionHandler: null,
        executed: false,

        livewireClickHandler: null,

        init() {
            this.findLivewireClickHandler();
        },

        findLivewireClickHandler() {
            const element = this.$el.querySelector('[wire\\:click]');
            this.livewireClickHandler = element.getAttribute('wire\:click');

            element.removeAttribute('wire\:click');
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
                setTimeout(() => this.executed = false, 2000);
            }

            if (this.actionHandler) {
                clearTimeout(this.actionHandler);
                this.actionHandler = null;
            }
        },

        callLivewireClickHandler() {
            if (!this.livewireClickHandler.includes('(')) {
                return this.$wire.call(this.livewireClickHandler);
            }

            const { method, params } = this.parseOutMethodAndParams(
                this.livewireClickHandler
            )

            this.$wire.call(method, ...params);
        },

        parseOutMethodAndParams(rawMethod) {
            let method = rawMethod
            let params = []
            const methodAndParamString = method.match(/(.*?)\((.*)\)/s)

            if (methodAndParamString) {
                method = methodAndParamString[1]

                // Use a function that returns it's arguments to parse and eval all params
                // This "$event" is for use inside the livewire event handler.
                let func = new Function('$event', `return (function () {
                for (var l=arguments.length, p=new Array(l), k=0; k<l; k++) {
                    p[k] = arguments[k];
                }
                return [].concat(p);
            })(${methodAndParamString[2]})`)

                params = func(this.eventContext)
            }

            return { method, params }
        }
    };
};
