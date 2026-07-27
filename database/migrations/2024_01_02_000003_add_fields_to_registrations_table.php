<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            // Remove old simple columns that we'll replace/extend
            // Add new structured fields
            $table->string('leader_name')->nullable()->after('team_name');
            $table->string('leader_phone')->nullable()->after('leader_name');
            $table->foreignId('theme_category_id')->nullable()->constrained('theme_categories')->nullOnDelete()->after('leader_phone');
            $table->string('solution_title')->nullable()->after('theme_category_id');
            $table->text('problem_statement')->nullable()->after('solution_title');
            $table->text('solution_description')->nullable()->after('problem_statement');
            $table->json('members')->nullable()->after('solution_description'); // array of member objects
        });
    }

    public function down(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            $table->dropForeign(['theme_category_id']);
            $table->dropColumn([
                'leader_name',
                'leader_phone',
                'theme_category_id',
                'solution_title',
                'problem_statement',
                'solution_description',
                'members',
            ]);
        });
    }
};
