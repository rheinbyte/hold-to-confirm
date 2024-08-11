<?php

namespace RheinByte\HoldToConfirm\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \RheinByte\HoldToConfirm\HoldToConfirm
 */
class HoldToConfirm extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \RheinByte\HoldToConfirm\HoldToConfirm::class;
    }
}
