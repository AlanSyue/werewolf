

@extends('frontend.layouts.app')

@section('title', app_name() . ' | ' . __('navs.general.home'))

@section('content')
    <page-header></page-header>
    <router-view></router-view>
@endsection