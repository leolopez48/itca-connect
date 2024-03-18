<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CampusSeeder::class,
            SchoolSeeder::class,
            CarreerSeeder::class,
            TypeEventSeeder::class,
            EventSeeder::class,
            PlaceTypeSeeder::class,
            DetailCampusPlaceSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
        ]);
    }
}
