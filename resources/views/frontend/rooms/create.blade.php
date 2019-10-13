@extends('frontend.layouts.app')

@section('content')
<section id="room_create">
    <div class="card text-center">
        <div class="card-body">
            <form method="POST" action="{{ route('frontend.rooms.store') }}">
                @csrf
                <div class="list-group">
                    <h4>遊戲規則</h4>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <div class="btn-group-toggle" data-toggle="buttons">
                                <label class="btn btn-secondary active">
                                    <input name="civilian_active" type="checkbox" checked autocomplete="off"> 平民
                                </label>
                            </div>
                        </div>
                        <input name="civilian_amount" type="text"  value='3' class="form-control" aria-label="Text input with checkbox">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <div class="btn-group-toggle" data-toggle="buttons">
                                <label class="btn btn-secondary active">
                                    <input name="prophet_actvie" type="checkbox" checked autocomplete="off"> 預言家
                                </label>
                            </div>
                        </div>
                        <input name="prophet_amount" type="text"  value='1' class="form-control" aria-label="Text input with checkbox">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <div class="btn-group-toggle" data-toggle="buttons">
                                <label class="btn btn-secondary active">
                                    <input name="witch_actvie" type="checkbox" checked autocomplete="off"> 女巫
                                </label>
                            </div>
                        </div>
                        <input name="witch_amount" type="text"  value='1' class="form-control" aria-label="Text input with checkbox">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <div class="btn-group-toggle" data-toggle="buttons">
                                <label class="btn btn-secondary active">
                                    <input name="knight_actvie" type="checkbox" checked autocomplete="off"> 騎士
                                </label>
                            </div>
                        </div>
                        <input name="knight_amount" type="text"  value='1' class="form-control" aria-label="Text input with checkbox">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <div class="btn-group-toggle" data-toggle="buttons">
                                <label class="btn btn-secondary active">
                                    <input name="hunter_active" type="checkbox" checked autocomplete="off"> 獵人
                                </label>
                            </div>
                        </div>
                        <input name="hunter_amount" type="text"  value='1' class="form-control" aria-label="Text input with checkbox">
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-secondary active">
                                <input name="werewolf_active" type="checkbox" checked autocomplete="off"> 狼人
                            </label>
                        </div>
                    </div>
                    <input name="werewolf_amount" type="text"  value='3' class="form-control" aria-label="Text input with checkbox">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-secondary active">
                                <input name="snowwolf_active" type="checkbox" checked autocomplete="off"> 雪狼
                            </label>
                        </div>
                    </div>
                    <input name="snowwolf_amount" type="text"  value='1' class="form-control" aria-label="Text input with checkbox">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-secondary active">
                                <input name="kingwolf_active" type="checkbox" checked autocomplete="off"> 狼王
                            </label>
                        </div>
                    </div>
                    <input name="kingwolf_amount" type="text"  value='1' class="form-control" aria-label="Text input with checkbox">
                </div>
                <button type="submit" class="btn btn-lg btn-primary btn-block">建立房間</button>
            </form>
        </div>
    </div>
</section>
@endsection