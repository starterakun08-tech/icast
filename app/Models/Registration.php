<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'institution',
        'team_name',
        'leader_name',
        'leader_phone',
        'theme_category_id',
        'solution_title',
        'problem_statement',
        'solution_description',
        'members',
        'category',
        'status',
        'notes',
    ];

    protected $casts = [
        'members' => 'array',
    ];

    public function themeCategory()
    {
        return $this->belongsTo(ThemeCategory::class);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }
}
