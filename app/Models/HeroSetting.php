<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_line1',
        'title_line2',
        'subtitle',
        'btn_primary_text',
        'btn_primary_url',
        'btn_secondary_text',
        'btn_secondary_url',
        'banner_image',
    ];

    /**
     * Get or create the singleton hero settings record.
     */
    public static function instance(): self
    {
        return self::firstOrCreate(['id' => 1], [
            'title_line1'        => 'Build Technology',
            'title_line2'        => 'That Matters',
            'subtitle'           => "Design solutions that empower people,\nstrengthen communities,\nand accelerate sustainable development",
            'btn_primary_text'   => 'Register Now',
            'btn_primary_url'    => '#register',
            'btn_secondary_text' => 'Learn More',
            'btn_secondary_url'  => '#about',
        ]);
    }
}
