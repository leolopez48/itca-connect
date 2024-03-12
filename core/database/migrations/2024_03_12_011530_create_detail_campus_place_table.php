<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_campus_place', function (Blueprint $table) {
            $table->id();
            $table->double('longitude', 2);
            $table->double('latitude', 2);

            $table->unsignedBigInteger('campus_id');
            $table->foreign('campus_id')->references('id')->on('campus');

            $table->unsignedBigInteger('place_type_id');
            $table->foreign('place_type_id')->references('id')->on('place_type');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_campus_place');
    }
};
