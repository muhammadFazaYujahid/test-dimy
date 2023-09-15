<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
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
            PaymentMethod::create([
                'name' => $faker->creditCardType(),
                'is_active' => 1
            ]);
        }
    }
}
