<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_settings', function (Blueprint $table) {
            $table->id();
            $table->string('title_line1')->default('Build Technology');
            $table->string('title_line2')->default('That Matters');
            $table->text('subtitle')->nullable();
            $table->string('btn_primary_text')->default('Register Now');
            $table->string('btn_primary_url')->default('#register');
            $table->string('btn_secondary_text')->default('Learn More');
            $table->string('btn_secondary_url')->default('#about');
            $table->string('banner_image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_settings');
    }
};
