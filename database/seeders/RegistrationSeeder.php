<?php

namespace Database\Seeders;

use App\Models\Registration;
use Illuminate\Database\Seeder;

class RegistrationSeeder extends Seeder
{
    public function run(): void
    {
        $samples = [
            ['name' => 'Andi Pratama',     'email' => 'andi@example.com',     'phone' => '+62812345671', 'institution' => 'ITS Surabaya',       'team_name' => 'CodeCraft',    'category' => 'team',       'status' => 'approved'],
            ['name' => 'Budi Santoso',     'email' => 'budi@example.com',     'phone' => '+62812345672', 'institution' => 'UI Jakarta',          'team_name' => 'InnovatorsX',  'category' => 'team',       'status' => 'pending'],
            ['name' => 'Citra Dewi',       'email' => 'citra@example.com',    'phone' => '+62812345673', 'institution' => 'UGM Yogyakarta',      'team_name' => null,           'category' => 'individual', 'status' => 'approved'],
            ['name' => 'Dimas Fahri',      'email' => 'dimas@example.com',    'phone' => '+62812345674', 'institution' => 'ITB Bandung',         'team_name' => 'DataMinds',    'category' => 'team',       'status' => 'pending'],
            ['name' => 'Eka Nurul',        'email' => 'eka@example.com',      'phone' => '+62812345675', 'institution' => 'PENS Surabaya',       'team_name' => null,           'category' => 'individual', 'status' => 'approved'],
            ['name' => 'Fajar Rizki',      'email' => 'fajar@example.com',    'phone' => '+62812345676', 'institution' => 'Unair Surabaya',      'team_name' => 'TechWave',     'category' => 'team',       'status' => 'rejected'],
            ['name' => 'Gita Nirmala',     'email' => 'gita@example.com',     'phone' => '+62812345677', 'institution' => 'UNDIP Semarang',      'team_name' => null,           'category' => 'individual', 'status' => 'pending'],
            ['name' => 'Hendra Wijaya',    'email' => 'hendra@example.com',   'phone' => '+62812345678', 'institution' => 'BINUS Jakarta',       'team_name' => 'NextGenDev',   'category' => 'team',       'status' => 'approved'],
        ];

        foreach ($samples as $data) {
            Registration::create($data);
        }
    }
}
