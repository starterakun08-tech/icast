<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create default superadmin if not exists
        User::firstOrCreate(
            ['email' => 'superadmin@icast.id'],
            [
                'name'     => 'Super Admin',
                'email'    => 'superadmin@icast.id',
                'password' => Hash::make('icast2026!'),
                'role'     => 'superadmin',
            ]
        );

        // Create a default admin if not exists
        User::firstOrCreate(
            ['email' => 'admin@icast.id'],
            [
                'name'     => 'Admin iCAST',
                'email'    => 'admin@icast.id',
                'password' => Hash::make('icast2026!'),
                'role'     => 'admin',
            ]
        );

        // Upgrade any existing users without role to admin
        User::whereNull('role')->orWhere('role', '')->update(['role' => 'admin']);
    }
}
