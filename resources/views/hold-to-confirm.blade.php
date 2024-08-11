<div
    wire:ignore
    x-on:mousedown="start()"
    x-on:touchstart="start()"
    x-on:mouseup="stop()"
    x-on:touchend="stop()"
    ax-load
    ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('hold-to-confirm', 'rheinbyte/hold-to-confirm') }}"
    x-data="holdToConfirm()">

    <x-filament-actions::action
        :action="$action"
        :badge="$getBadge()"
        :badge-color="$getBadgeColor()"
        dynamic-component="filament::button"
        :icon-position="$getIconPosition()"
        :labeled-from="$getLabeledFromBreakpoint()"
        :outlined="$isOutlined()"
        :size="$getSize()"
        class="fi-ac-btn-action relative overflow-hidden"
    >
        <div style="position: absolute; z-index: 1; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0, 0, 0, 0.1);" x-bind:style="{
                'width': actionHandler && ! executed ? '100%': 0,
                'transition-property': 'all',
                'transition-duration': executed ? '0' : `1000ms`
             }"></div>

        <div style="position: relative; z-index: 30;">
            {{ $getLabel() }}
        </div>
    </x-filament-actions::action>
</div>
