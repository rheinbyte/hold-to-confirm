<div
    class="relative p-2"
    wire:ignore
    x-on:mousedown="start()"
    x-on:touchstart="start()"
    x-on:mouseup="stop()"
    x-on:touchend="stop()"
    ax-load
    x-load-css="[@js(\Filament\Support\Facades\FilamentAsset::getStyleHref('hold-to-confirm', 'rheinbyte/hold-to-confirm'))]"
    ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('hold-to-confirm', 'rheinbyte/hold-to-confirm') }}"
    x-data="holdToConfirm()">

    <div class="fi-rheinbyte-hold-to-confirm-indicator absolute left-0 top-0 bottom-0 bg-primary-300 rounded-md opacity-40" x-bind:style="{
        'width': actionHandler && ! executed ? '100%': '0',
        'transition-property': 'all',
        'transition-duration': executed ? '0' : `1000ms`
     }"></div>

    <x-filament-actions::action
        :action="$action"
        :badge="$getBadge()"
        :badge-color="$getBadgeColor()"
        dynamic-component="filament::icon-button"
        :size="$getSize()"
        class="fi-ac-icon-btn-action relative background: red;"
    >
        <div style="position: relative; z-index: 30;">
            {{ $getLabel() }}
        </div>
    </x-filament-actions::action>
</div>
