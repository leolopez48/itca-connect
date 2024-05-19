<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            [
                'name' => 'Leonel Antonio López Valencia',
                'carnet' => '040119',
                'email' => 'leonel.lopez19@itca.edu.sv',
                'role_id' => 3,
                'career_id' => 1,
                'ip' => null,
                'email_verified_at' => now(),
                'password' => Hash::make('Leonel23'),
            ]
        ]);
    }
}
