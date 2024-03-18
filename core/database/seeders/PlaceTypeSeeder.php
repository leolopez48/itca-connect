<?php

namespace Database\Seeders;

use App\Models\PlaceType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PlaceType::insert([
            [
                'name' => 'Comida',
                'icon' => 'mdi-food',
            ]
        ]);
    }
}
