#!/usr/bin/env python3
"""Render PoolMate 1200×630 share card at 2× then downscale."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 2400, 1260  # 2× of 1200×630
ORANGE = (240, 90, 16)  # #F05A10
DEEP = (194, 65, 12)  # #C2410C
INK = (28, 25, 23)  # #1C1917
CREAM = (255, 241, 230)  # #FFF1E6
PAPER = (255, 251, 247)  # #FFFBF7
FONTS = Path("/workspace/.grok/fonts")


def mix(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))


def rounded_rect(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def paper_field() -> Image.Image:
    img = Image.new("RGB", (W, H), PAPER).convert("RGBA")
    wash = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(wash)
    # Central cream bloom
    d.ellipse((-200, -80, W + 200, 980), fill=(*CREAM, 210))
    # Warm orange pool under the corridor
    d.ellipse((120, 720, W - 120, H + 220), fill=(*ORANGE, 42))
    wash = wash.filter(ImageFilter.GaussianBlur(90))
    return Image.alpha_composite(img, wash)


def draw_lane_mark(draw, cx, cy, bar_w, bar_h, gap, color):
    """Two parallel rounded bars — the PoolMate corridor mark."""
    top = cy - gap / 2 - bar_h
    bot = cy + gap / 2
    x0 = cx - bar_w / 2
    rounded_rect(draw, (x0, top, x0 + bar_w, top + bar_h), bar_h / 2, color)
    rounded_rect(draw, (x0, bot, x0 + bar_w, bot + bar_h), bar_h / 2, color)
    dash_w = bar_w * 0.38
    dash_h = max(4, int(bar_h * 0.38))
    rounded_rect(
        draw,
        (cx - dash_w / 2, cy - dash_h / 2, cx + dash_w / 2, cy + dash_h / 2),
        dash_h / 2,
        mix(color, INK, 0.22),
    )


def draw_corridor(base: Image.Image) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    y_mid = 900
    lane_h = 56
    gap = 36
    margin = 96
    x0, x1 = margin, W - margin
    r = 28

    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.rounded_rectangle(
        (margin - 48, y_mid - lane_h - gap - 36, W - margin + 48, y_mid + lane_h + gap + 36),
        radius=56,
        fill=(*ORANGE, 48),
    )
    glow = glow.filter(ImageFilter.GaussianBlur(32))
    overlay = Image.alpha_composite(overlay, glow)
    d = ImageDraw.Draw(overlay)

    top_y = y_mid - gap / 2 - lane_h
    bot_y = y_mid + gap / 2
    rounded_rect(d, (x0, top_y + 7, x1, top_y + lane_h + 7), r, (*DEEP, 255))
    rounded_rect(d, (x0, top_y, x1, top_y + lane_h), r, (*ORANGE, 255))
    rounded_rect(d, (x0, bot_y + 7, x1, bot_y + lane_h + 7), r, (*DEEP, 255))
    rounded_rect(d, (x0, bot_y, x1, bot_y + lane_h), r, (*ORANGE, 255))

    path_y0 = top_y + lane_h + 6
    path_y1 = bot_y - 6
    rounded_rect(d, (x0 + 28, path_y0, x1 - 28, path_y1), 10, (*CREAM, 255))

    dash_y = (path_y0 + path_y1) / 2
    dash_h = 8
    dash_w = 36
    pitch = 64
    x = x0 + 80
    while x + dash_w < x1 - 80:
        rounded_rect(
            d,
            (x, dash_y - dash_h / 2, x + dash_w, dash_y + dash_h / 2),
            4,
            (*ORANGE, 255),
        )
        x += pitch

    stops = 5
    for i in range(stops):
        t = (i + 0.5) / stops
        sx = x0 + (x1 - x0) * t
        rad = 14
        d.ellipse((sx - rad - 3, dash_y - rad - 3, sx + rad + 3, dash_y + rad + 3), fill=(*DEEP, 255))
        d.ellipse((sx - rad, dash_y - rad, sx + rad, dash_y + rad), fill=(*CREAM, 255))
        d.ellipse((sx - 5, dash_y - 5, sx + 5, dash_y + 5), fill=(*ORANGE, 255))

    return Image.alpha_composite(base.convert("RGBA"), overlay)


def main():
    img = paper_field()

    guides = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(guides)
    for y in (198, 236):
        gd.rectangle((0, y, W, y + 3), fill=(*ORANGE, 20))
    img = Image.alpha_composite(img, guides)
    img = draw_corridor(img)
    draw = ImageDraw.Draw(img)

    title_font = ImageFont.truetype(str(FONTS / "LiberationSans-Bold.ttf"), 176)
    tag_font = ImageFont.truetype(str(FONTS / "LiberationSans-Regular.ttf"), 44)
    svc_font = ImageFont.truetype(str(FONTS / "LiberationSansNarrow-Bold.ttf"), 32)

    draw_lane_mark(draw, W / 2, 318, 120, 16, 14, ORANGE)

    title = "PoolMate"
    tb = draw.textbbox((0, 0), title, font=title_font)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    tx = (W - tw) / 2 - tb[0]
    ty = 370
    draw.text((tx, ty + 4), title, font=title_font, fill=(*INK, 30))
    draw.text((tx, ty), title, font=title_font, fill=(*INK, 255))

    tag = "Share the corridor"
    kb = draw.textbbox((0, 0), tag, font=tag_font)
    kw = kb[2] - kb[0]
    kx = (W - kw) / 2 - kb[0]
    ky = ty + th + 28
    draw.text((kx, ky), tag, font=tag_font, fill=(*DEEP, 255))

    services = "RIDES   ·   CARGO   ·   FOOD   ·   DELIVERY"
    sb = draw.textbbox((0, 0), services, font=svc_font)
    sw = sb[2] - sb[0]
    sx = (W - sw) / 2 - sb[0]
    sy = 1088
    draw.text((sx, sy), services, font=svc_font, fill=(*INK, 155))

    out = img.convert("RGB").resize((1200, 630), Image.Resampling.LANCZOS)
    dest = Path("/workspace/.grok/og-card-raw.png")
    out.save(dest, "PNG")
    print(f"wrote {dest} {out.size}")


if __name__ == "__main__":
    main()
