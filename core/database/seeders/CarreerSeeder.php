<?php

namespace Database\Seeders;

use App\Models\Carreer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarreerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Carreer::insert([
            [
                'name' => 'Ing. En Desarrollo de Software',
                'school_id' => 1,
            ]
        ]);
    }
}
