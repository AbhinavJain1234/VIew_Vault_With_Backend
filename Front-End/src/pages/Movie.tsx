import React, { useEffect, useState } from 'react'

type MovieItem = { id:number, title:string, img:string, year?:number, rating?:number }

const dummyPopular: MovieItem[] = [
  {id:1, title:'The Blue Sky', img:'https://picsum.photos/seed/1/800/450', year:2023, rating:7.8},
  {id:2, title:'Midnight Run', img:'https://picsum.photos/seed/2/800/450', year:2022, rating:8.1},
  {id:3, title:'Ocean Drive', img:'https://picsum.photos/seed/3/800/450', year:2021, rating:7.5},
  {id:4, title:'Starlight', img:'https://picsum.photos/seed/4/800/450', year:2024, rating:8.4},
]

const dummyList = Array.from({length:8}).map((_,i)=>({
  id:100+i, title:`Sample Movie ${i+1}`, img:`https://picsum.photos/seed/list${i}/400/600`, year:2018+i, rating:6.5 + (i%5)
})) as MovieItem[]

export default function Movie(){
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchRef = React.useRef<{startX:number|null} | null>(null)

  useEffect(()=>{
    if(paused) return
    const t = setInterval(()=> setIndex(i=> (i+1) % dummyPopular.length), 4000)
    return ()=> clearInterval(t)
  },[paused])

  function prev(){ setIndex(i=> (i-1 + dummyPopular.length) % dummyPopular.length) }
  function next(){ setIndex(i=> (i+1) % dummyPopular.length) }

  function onTouchStart(e:React.TouchEvent){
    touchRef.current = { startX: e.touches[0].clientX }
  }
  function onTouchMove(e:React.TouchEvent){
    if(!touchRef.current || touchRef.current.startX===null) return
    const dx = e.touches[0].clientX - touchRef.current.startX
    if(Math.abs(dx) > 50){
      if(dx > 0) prev(); else next()
      touchRef.current.startX = null
    }
  }

  return (
    <div className="container py-4">
      <section className="mb-4 position-relative" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
        <div className="movie-slider mb-3">
          {dummyPopular.map((m,i)=> (
            <div key={m.id} className={`movie-slide ${i===index? 'active':''}`} aria-hidden={i===index? 'false':'true'}>
              <img src={m.img} alt={m.title} />
              <div className="position-absolute start-0 bottom-0 p-3 text-white" style={{textShadow:'0 2px 6px rgba(0,0,0,.6)'}}>
                <h3 className="h4 mb-0">{m.title}</h3>
                <small className="text-muted">{m.year} • ★ {m.rating}</small>
              </div>
            </div>
          ))}

          <div className="carousel-controls d-flex align-items-center justify-content-between p-2">
            <button className="btn btn-outline-light" onClick={prev} aria-label="Previous">❮</button>
            <div className="carousel-indicators">
              {dummyPopular.map((_,i)=> (
                <button key={i} className={i===index? 'active':''} onClick={()=>setIndex(i)} aria-label={`Go to slide ${i+1}`}></button>
              ))}
            </div>
            <button className="btn btn-outline-light" onClick={next} aria-label="Next">❯</button>
          </div>
        </div>
      </section>

      <section className="mb-4">
        <div className="section-title mb-2">
          <h4>Popular</h4>
          <small className="text-muted">See all</small>
        </div>
        <div className="h-scroller">
          {dummyList.map(m=> (
            <div key={m.id} className="card movie-card">
              <img src={m.img} alt={m.title} />
              <div className="card-body p-2">
                <h6 className="mb-1">{m.title}</h6>
                <small className="text-muted">{m.year} · ★ {m.rating}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <div className="section-title mb-2">
          <h4>Top Rated</h4>
          <small className="text-muted">See all</small>
        </div>
        <div className="h-scroller">
          {dummyList.map(m=> (
            <div key={m.id+200} className="card movie-card">
              <img src={m.img} alt={m.title} />
              <div className="card-body p-2">
                <h6 className="mb-1">{m.title}</h6>
                <small className="text-muted">{m.year} · ★ {m.rating}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <div className="section-title mb-2">
          <h4>Now Playing</h4>
          <small className="text-muted">See all</small>
        </div>
        <div className="h-scroller">
          {dummyList.map(m=> (
            <div key={m.id+400} className="card movie-card">
              <img src={m.img} alt={m.title} />
              <div className="card-body p-2">
                <h6 className="mb-1">{m.title}</h6>
                <small className="text-muted">{m.year} · ★ {m.rating}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
