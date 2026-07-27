<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_label',
        'heading',
        'body',
        'cta_text',
        'cta_url',
    ];

    public static function instance(): self
    {
        return self::firstOrCreate(['id' => 1], [
            'section_label' => 'ABOUT',
            'heading'       => 'Hackathon',
            'body'          => "The iCast Hackathon brings together students,\nresearchers,\ndesigners,\ndevelopers,\nand innovators\nto solve meaningful challenges\nthrough technology.",
            'cta_text'      => 'Register Now →',
            'cta_url'       => '#register',
        ]);
    }
}
