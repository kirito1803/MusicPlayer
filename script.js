// Short syntax
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Common variables
const playlist = $('.playlist')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn.btn-toggle-play')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const player = $('.player')
const progress = $('.progress')
let songItems = $$('.song')


// CD  rotated
const cdAnimate = cdThumb.animate({
        transform: 'rotate(360deg) scale(1)'
    },
    {
        duration: 10000,
        iterations: Infinity
    }
)
cdAnimate.pause()

// App
const app = {
    // Common var and functions
    // Song List
    songs: [
        {
            name: 'Túy Âm', 
            singer: 'Xesi, Masew',
            path: './source/tuy_am/Tuy-Am-Xesi-Masew-Nhat-Nguyen.mp3',
            image: './source/tuy_am/tuy_am_pic.jpg'
        },
        {
            name: 'Đại Thiên Bồng', 
            singer: 'Thanh Thủy',
            path: './source/dai_thien_bong/Dai-Thien-Bong-Thanh-Thuy-er-er.mp3',
            image: './source/dai_thien_bong/dai_thien_bong_pic.jpg'
        },
        {
            name: 'Ngẫu Hứng', 
            singer: 'Hoaprox',
            path: './source/ngau_hung/Ngau-Hung-Hoaprox.mp3',
            image: './source/ngau_hung/ngau_hung_pic.jpg'
        },
        {
            name: 'Yêu 5', 
            singer: 'Rhymastic',
            path: './source/yeu_5/Yeu-5-Rhymastic.mp3',
            image: './source/yeu_5/yeu_5_pic.jpg'
        },
        {
            name: 'Thời Không Sai Lệch', 
            singer: 'Ngải Thần',
            path: './source/thoi_khong_sai_lech/Thoi-Khong-Sai-Lech-Ngai-Than.mp3',
            image: './source/thoi_khong_sai_lech/thoi_khong_sai_lech.jpg'
        },
        {
            name: 'Dĩ Vãng Nhạt Nhòa', 
            singer: 'Hà Nhi',
            path: './source/di_vang_nhat_nhoa/Di-Vang-Nhat-Nhoa-Cover-Ha-Nhi.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2018/11/12/7/f/3/1/1542009008716_640.jpg'
        },
        {
            name: 'Nàng Thơ', 
            singer: 'Hoàng Dũng',
            path: './source/nang_tho/Nang-Tho-Hoang-Dung.mp3',
            image: 'https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/08/10/nang-thodocx-1628603317716.jpeg'
        },
        {
            name: 'Xin Lỗi', 
            singer: 'Nguyên Hà',
            path: './source/xin_loi/Xin-Loi-Nguyen-Ha.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2017/12/14/8/8/d/f/1513224702420_640.jpg'
        },
        {
            name: 'Người Ta Nói', 
            singer: 'Minh Mon',
            path: './source/nguoi_ta_noi/Nguoi-Ta-Noi-Acoustic-Cover-Minh-Mon-Vu-Minh.mp3',
            image: 'https://i.ytimg.com/vi/5ooDT43Y6sE/maxresdefault.jpg'
        },
        {
            name: 'Em Của Quá Khứ', 
            singer: 'Huy Nam',
            path: './source/em_cua_qua_khu/Em-Cua-Qua-Khu-Huy-Nam-A.mp3',
            image: 'https://i.ytimg.com/vi/itH7J_cnjQU/maxresdefault.jpg'
        },
        {
            name: 'Vết Mưa', 
            singer: 'Vũ Cát Tường',
            path: './source/vet_mua/Vet-Mua-Vu-Cat-Tuong.mp3',
            image: 'https://i.ytimg.com/vi/MtXzsyV-wsQ/maxresdefault.jpg'
        },
    ],

    currentIndex: 0,
    randomList: [],
    playEvent: function() {
        player.classList.add('playing')
        audio.play()
        cdAnimate.play()
        app.scrollCurrent()
    },
    pauseEvent: function() {
        player.classList.remove('playing')
        audio.pause()
        cdAnimate.pause()
    },

    // Define properties
    defineProperties: function() {
        Object.defineProperty(this, 'CurrentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    // Render 
    render: function() {
        const htmls = this.songs.map((song, index)=>{
            return `<div class="song ${index==app.currentIndex?'active':''}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>`
        })
        
        playlist.innerHTML = htmls.join('')
    },

    // Find and active current song
    activeCurrent: function() {
        songItems = $$('.song')
        songItems.forEach((songNode)=>{
            if(songNode.classList.contains('active')) {
                songNode.classList.remove('active')
            }

        })
        for (let i=0; i<app.songs.length; i++){
            let name = songItems[i].querySelector('.title').textContent
                if (name === app.songs[app.currentIndex].name) {
                    songItems[i].classList.add('active')
                }
            
        }
    },

    // Handle Events
    handleEvents: function() {
        // Scroll and Fade
        const cdWidth = cd.offsetWidth
        document.onscroll = ()=>{
            const scrollValue = document.documentElement.scrollTop || window.scrollY
            const newCDWidth = cdWidth - scrollValue

            if(newCDWidth > 0) {
                cd.style.width = `${newCDWidth}px`
                cd.style.opacity = newCDWidth/cdWidth
            }
            else {
                cd.style.width = '0px'
            }
        }

        // Play and Pause
        playBtn.onclick = ()=>{
            if(!player.classList.contains('playing')) {
                app.playEvent()
            }
            else {
                app.pauseEvent()
            }
        }

        // Song progress
        audio.ontimeupdate = function() {
            if(audio.duration) {
                progress.value = Math.round((audio.currentTime / audio.duration) *100)
            }
        }

        // Seeked
        progress.onchange = function(event) {
            audio.currentTime = (event.target.value*audio.duration)/100
        }

        // Next button
        nextBtn.onclick = ()=>{
            // If random
            if(randomBtn.classList.contains('active')) {
                // Finding next song
                for(let index=0; index<app.songs.length; index++) {
                    if(app.randomList[index] == app.currentIndex) {
                        if(index==app.songs.length-1) {
                            app.currentIndex = app.randomList[0]
                        }
                        else {
                            app.currentIndex = app.randomList[index+1]
                        }
                        break;
                    }
                }
            }
            // If normal
            else {
                if(app.currentIndex+1<=app.songs.length-1) {
                    app.currentIndex++;
                }
                else {
                    app.currentIndex = 0;
                }
            }

            // Loading next song
            app.loadCurrentSong()
            app.playEvent()
            app.activeCurrent()
            app.scrollCurrent()
        }

        // Previous button
        prevBtn.onclick = ()=>{
            // If random
            if(randomBtn.classList.contains('active')) {
                // Finding previous song
                for(let index=0; index<app.songs.length; index++) {
                    if(app.randomList[index]==app.currentIndex) {
                        if(index==0) {
                            app.currentIndex = app.randomList[app.songs.length-1]
                        }
                        else {
                            app.currentIndex = app.randomList[index-1]
                        }
                        break;
                    }
                }
            }
            // If normal
            else {
                if(app.currentIndex-1<0) {
                    app.currentIndex = app.songs.length-1;
                    
                }
                else {
                    app.currentIndex--;
                }
            }

            // Loading next song
            app.loadCurrentSong()
            app.playEvent()
            app.activeCurrent()
            app.scrollCurrent()
        }

        // Random button
        randomBtn.onclick = ()=>{
            // If random
            if(!randomBtn.classList.contains('active')) {
                randomBtn.classList.add('active')

                // Generate random list
                for(let i=0; i<app.songs.length; i++) {
                    let randomIndex = Math.round(Math.random()*(app.songs.length-1))
                    while (app.randomList[randomIndex]!==undefined) {
                        randomIndex = Math.round(Math.random()*(app.songs.length-1))
                    }
                    app.randomList[randomIndex] = i
                }
    
                // Render random list
                let randomHtmls = app.randomList.map((randomI)=>{
                    return `<div class="song">
                    <div class="thumb" style="background-image: url('${app.songs[randomI].image}')">
                    </div>
                    <div class="body">
                      <h3 class="title">${app.songs[randomI].name}</h3>
                      <p class="author">${app.songs[randomI].singer}</p>
                    </div>
                    <div class="option">
                      <i class="fas fa-ellipsis-h"></i>
                    </div>
                  </div>`
                })

                playlist.innerHTML = randomHtmls.join('')
                app.applyClickable()
                app.activeCurrent()
                app.scrollCurrent()

            }
            // If normal
            else {
                randomBtn.classList.remove('active')
                app.randomList = []
                app.render()
                app.activeCurrent()
                app.applyClickable()
                app.scrollCurrent()
            }
        }

        // Repeat button
        repeatBtn.onclick = ()=>{
            if(!repeatBtn.classList.contains('active')) {
                repeatBtn.classList.add('active')
            }
            else {
                repeatBtn.classList.remove('active')
            }
        }

        // Ended song
        audio.onended = ()=>{
            // If repeat
            if(repeatBtn.classList.contains('active')) {
                audio.play() 
            }
            else {
                // If random
                if(randomBtn.classList.contains('active')) {
                    // Finding next song
                    for(let index=0; index<app.songs.length; index++) {
                        if(app.randomList[index]==app.currentIndex) {
                            if(index==app.songs.length-1){
                                app.currentIndex = app.randomList[0]
                            }
                            else {
                                app.currentIndex = app.randomList[index+1]
                            }
                            break;
                        }
                    }
                }
                // If normal
                else {
                    if(app.currentIndex+1<=app.songs.length-1) {
                        app.currentIndex++;
                    }
                    else {
                        app.currentIndex = 0;
                    }
                }

                // Loading next song
                app.loadCurrentSong()
                app.playEvent()
                app.activeCurrent()
            }
        }
    },

    // Load current song
    loadCurrentSong: function() {
        heading.innerHTML = app.CurrentSong.name
        cdThumb.style.backgroundImage = `url('${app.CurrentSong.image}')`
        audio.src = app.CurrentSong.path
    },

    // Apply clickable
    applyClickable: function() {
        songItems = $$('.song')
        songItems.forEach((song)=>{
            song.onclick = ()=>{
                for (let i=0; i<app.songs.length; i++) {
                    if(app.songs[i].name === song.querySelector('.title').textContent) {
                        app.currentIndex = i
                    }
                }
                app.activeCurrent()
                app.loadCurrentSong()
                app.playEvent()
            }
        })
    },

    // Scroll to view
    scrollCurrent: function() {
        setTimeout(()=>{
            let activeNode = $('.song.active')
            activeNode.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 100)
    },

    // Operate
    start: function() {
        // Define
        this.defineProperties()
        // Render songs list
        this.render()
        songItems = $$('.song')
        // Load first song
        this.loadCurrentSong()
        // Handling Events
        this.handleEvents()
        this.applyClickable()
    }
}

// Run app
app.start()


