<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        for ($i=0; $i < 10; $i++) { 
            Product::create([
                'name' => 'food' . $i,
                'price' => $faker->numerify()
            ]);
        }
    }
}
