<?php

namespace RheinByte\HoldToConfirm\Tables\Actions;

use Filament\Tables\Actions\Action;
use RheinByte\HoldToConfirm\Exceptions\NotSupportedFeature;

class HoldToConfirmAction extends Action
{
    public function configure(): static
    {
        return $this->view('rheinbyte::hold-to-confirm-button-action');
    }

    public function iconButton(): static
    {
        return $this->view('rheinbyte::hold-to-confirm-icon-button-action');
    }

    /**
     * @throws NotSupportedFeature
     */
    public function link(): static
    {
        throw NotSupportedFeature::make(
            'Links are currently not supported.'
        );
    }

    /**
     * @throws NotSupportedFeature
     */
    public function grouped(): static
    {
        throw NotSupportedFeature::make(
            'Groups are currently not supported.'
        );
    }
}
