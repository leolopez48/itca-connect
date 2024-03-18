<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::insert([
            [
                'name' => 'Actividad de Bienvenida',
                'date_start' => '2024-03-16 8:00',
                'date_end' => '2024-03-16 12:00',
                'type_event_id' => 1,
            ]
        ]);
    }
}
