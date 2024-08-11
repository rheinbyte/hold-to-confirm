# Hold to confirm to trigger a Filament Action - under development

[![Latest Version on Packagist](https://img.shields.io/packagist/v/rheinbyte/hold-to-confirm.svg?style=flat-square)](https://packagist.org/packages/rheinbyte/hold-to-confirm)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/rheinbyte/hold-to-confirm/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/rheinbyte/hold-to-confirm/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/rheinbyte/hold-to-confirm/fix-php-code-styling.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/rheinbyte/hold-to-confirm/actions?query=workflow%3A"Fix+PHP+code+styling"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/rheinbyte/hold-to-confirm.svg?style=flat-square)](https://packagist.org/packages/rheinbyte/hold-to-confirm)

![](art/hold-to-confirm.gif)

## Todos and problems to solve

- Support link button type and groups
- Support dark mode
- Support for Alpine directives and routes
- There is room for improvement in the design and animation
- It's a bit hacky at the moment how this package hooks into the wire:click event (see hold-to-confirm.js). However, a wire:ignore is currently necessary that every listener works. 

## Installation

You can install the package via composer:

```bash
composer require rheinbyte/hold-to-confirm
```

## Usage

```php
HoldToConfirmAction::make('do something')
    ->action(fn() => /* Doing something */)
```

## Testing

```bash
composer test
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [RheinByte](https://github.com/rheinbyte)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
