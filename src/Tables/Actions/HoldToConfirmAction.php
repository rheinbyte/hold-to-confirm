<?php

namespace RheinByte\HoldToConfirm\Tables\Actions;

use Filament\Tables\Actions\Action;
use RheinByte\HoldToConfirm\Exceptions\NotSupportedFeature;

class HoldToConfirmAction extends Action
{
    public function configure(): static {
        return $this->view('rheinbyte::hold-to-confirm');
    }

    /**
     * @throws NotSupportedFeature
     */
    public function iconButton(): static {
        throw NotSupportedFeature::make(
            'Icon buttons are currently not supported.'
        );
    }

    /**
     * @throws NotSupportedFeature
     */
    public function link(): static {
        throw NotSupportedFeature::make(
            'Links are currently not supported.'
        );
    }

    /**
     * @throws NotSupportedFeature
     */
    public function grouped(): static {
        throw NotSupportedFeature::make(
            'Groups are currently not supported.'
        );
    }
}
