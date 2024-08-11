<?php

namespace RheinByte\HoldToConfirm;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Asset;
use Filament\Support\Assets\Css;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Facades\FilamentIcon;
use Illuminate\Filesystem\Filesystem;
use Livewire\Features\SupportTesting\Testable;
use RheinByte\HoldToConfirm\Commands\HoldToConfirmCommand;
use RheinByte\HoldToConfirm\Testing\TestsHoldToConfirm;
use Spatie\LaravelPackageTools\Commands\InstallCommand;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class HoldToConfirmServiceProvider extends PackageServiceProvider
{
    public static string $name = 'hold-to-confirm';

    public static string $viewNamespace = 'rheinbyte';

    public function configurePackage(Package $package): void
    {
        $package->name(static::$name)
            ->hasInstallCommand(function (InstallCommand $command) {
                $command
                    ->publishConfigFile()
                    ->askToStarRepoOnGitHub('rheinbyte/hold-to-confirm');
            });

        $configFileName = $package->shortName();

        if (file_exists($package->basePath("/../config/{$configFileName}.php"))) {
            $package->hasConfigFile();
        }

        if (file_exists($package->basePath('/../resources/views'))) {
            $package->hasViews(static::$viewNamespace);
        }
    }

    public function packageRegistered(): void {}

    public function packageBooted(): void
    {
        FilamentAsset::register(
            $this->getAssets(),
            $this->getAssetPackageName()
        );

        Testable::mixin(new TestsHoldToConfirm);
    }

    protected function getAssetPackageName(): ?string
    {
        return 'rheinbyte/hold-to-confirm';
    }

    /**
     * @return array<Asset>
     */
    protected function getAssets(): array
    {
        return [
            AlpineComponent::make('hold-to-confirm', __DIR__ . '/../resources/dist/hold-to-confirm.js'),
        ];
    }
}
