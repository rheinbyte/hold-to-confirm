<?php

namespace RheinByte\HoldToConfirm\Exceptions;

use Exception;

class NotSupportedFeature extends Exception
{
    public static function make(string $message): static
    {
        return new static($message);
    }
}
