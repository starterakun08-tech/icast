<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_settings', function (Blueprint $table) {
            $table->id();
            $table->string('section_label')->default('ABOUT');
            $table->string('heading')->default('Hackathon');
            $table->text('body');
            $table->string('cta_text')->default('Register Now →');
            $table->string('cta_url')->default('#register');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_settings');
    }
};
