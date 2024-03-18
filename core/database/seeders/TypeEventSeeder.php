<?php

namespace Database\Seeders;

use App\Models\TypeEvent;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeEventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TypeEvent::insert([
            [
                'name' => 'Actividad',
                'color' => 'red',
                'campus_id' => 1,
            ]
        ]);
    }
}
