function r(){return{actionHandler:null,executed:!1,livewireClickHandler:null,init(){this.findLivewireClickHandler()},findLivewireClickHandler(){let e=this.$el.querySelector("[wire\\:click]");this.livewireClickHandler=e.getAttribute("wire:click"),e.removeAttribute("wire:click")},start(){this.executed=!1,this.actionHandler=setTimeout(async()=>{this.callLivewireClickHandler(),this.executed=!0},800)},stop(){this.executed&&setTimeout(()=>this.executed=!1,2e3),this.actionHandler&&(clearTimeout(this.actionHandler),this.actionHandler=null)},callLivewireClickHandler(){if(!this.livewireClickHandler.includes("("))return this.$wire.call(this.livewireClickHandler);let{method:e,params:t}=this.parseOutMethodAndParams(this.livewireClickHandler);this.$wire.call(e,...t)},parseOutMethodAndParams(e){let t=e,l=[],i=t.match(/(.*?)\((.*)\)/s);return i&&(t=i[1],l=new Function("$event",`return (function () {
                for (var l=arguments.length, p=new Array(l), k=0; k<l; k++) {
                    p[k] = arguments[k];
                }
                return [].concat(p);
            })(${i[2]})`)(this.eventContext)),{method:t,params:l}}}}export{r as default};
