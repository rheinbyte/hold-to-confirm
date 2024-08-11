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
        <div class="fi-rheinbyte-hold-to-confirm-indicator absolute left-0 top-0 bottom-0 bg-primary-100 rounded-md opacity-30" x-bind:style="{
                'width': actionHandler && ! executed ? '100%': 0,
                'transition-property': 'all',
                'transition-duration': executed ? '0' : `1000ms`
             }"></div>

        <div style="position: relative; z-index: 30;">
            {{ $getLabel() }}
        </div>
    </x-filament-actions::action>
</div>
