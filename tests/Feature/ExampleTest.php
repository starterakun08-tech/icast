<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the home page returns successfully after seeding.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $this->seed();
        $response = $this->get('/');
        $response->assertStatus(200);
    }
}
