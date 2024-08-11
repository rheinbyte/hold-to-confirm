<?php

namespace RheinByte\HoldToConfirm\Commands;

use Illuminate\Console\Command;

class HoldToConfirmCommand extends Command
{
    public $signature = 'hold-to-confirm';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
